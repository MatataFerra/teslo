import { useRouter } from "next/router";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { AdminLayout } from "../../../components/layouts";
import { IProductSize, ISizeStock, ISize } from "../../../interfaces";
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { dbProducts } from "../../../database";
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { tesloApi } from "../../../api";
import { Product } from "../../../models";
import { TagManager } from "../../../components/ui";

const validTypes = ["shirts", "pants", "hoodies", "hats"];
const validGender = ["men", "women", "kid", "unisex"];
const validSizes: ISize[] = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISizeStock[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
  gender: string;
}

interface Props {
  product: IProductSize;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: product,
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const newSlug =
          value.title
            ?.trim()
            .toLowerCase()
            .replaceAll("'", "")
            .replace(/\s/g, "-")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") ?? "default-slug";

        setValue("slug", newSlug);
      }

      if (name === "sizes") {
        const countStock = value.sizes?.reduce((acc, size) => {
          return acc + (size?.stock ?? 0);
        }, 0);

        setValue("inStock", countStock!);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return;

    for (let i = 0; i < target.files.length; i++) {
      const formData = new FormData();
      formData.append("file", target.files[i]);
      const { data } = await tesloApi.post<{ message: string }>("/admin/upload", formData);

      setValue("images", [...getValues("images"), data.message], { shouldValidate: true });
    }
  };

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 2) {
      return alert("Please upload at least 2 images");
    }
    setIsSaving(true);

    try {
      await tesloApi({
        url: "/admin/products",
        method: form._id ? "PUT" : "POST", // si hay id es un put, sino post
        data: form,
      });

      if (!form._id) {
        setIsSaving(false);
        return router.replace(`/admin/products/${form.slug}`); // recargar navegador
      } else {
        return setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  const onChangeSize = (size: ISize) => {
    const currentSizes = getValues("sizes");

    if (currentSizes.find((s) => s.size === size)?.size) {
      console.log("ya existe");
      return setValue(
        "sizes",
        currentSizes.filter((s) => s.size !== size),
        { shouldValidate: true }
      );
    }

    const sizes = {
      size: size,
      stock: 1,
      sizeRestStock: 1,
    };

    setValue("sizes", [...currentSizes, sizes], { shouldValidate: true });
  };

  const onChangeStock = (stock: number, size?: ISizeStock) => {
    if (!size) return;
    const currentSizes = getValues("sizes");

    const newSizes = currentSizes.map((s) => {
      if (s.size === size.size) {
        return {
          ...s,
          stock,
        };
      }
      return s;
    });

    setValue("sizes", newSizes, { shouldValidate: true });
  };

  const onDeleteImage = (image: string) => {
    setValue(
      "images",
      getValues("images").filter((i) => i !== image),
      { shouldValidate: true }
    );
  };

  return (
    <AdminLayout back title={"Producto"} subtitle={`Editando: ${product.title}`} icon={<DriveFileRenameOutline />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
          <Button
            disabled={isSaving}
            color='secondary'
            startIcon={<SaveOutlined />}
            sx={{ width: "150px" }}
            type='submit'
            onKeyUp={(e) => e.preventDefault()}>
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label='Título'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register("title", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label='Descripción'
              variant='filled'
              fullWidth
              rows={4}
              sx={{ mb: 1 }}
              {...register("description", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label='Inventario'
              type='number'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register("inStock", {
                required: "Este campo es requerido",
                minLength: { value: 0, message: "Necesita completar este campo" },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label='Precio'
              type='number'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register("price", {
                required: "Este campo es requerido",
                minLength: { value: 0, message: "Debe valer al menos 0" },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                row
                value={getValues("type")}
                onChange={(e) => setValue("type", e.target.value, { shouldValidate: true })}>
                {validTypes.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color='secondary' />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Género</FormLabel>
              <RadioGroup
                row
                value={getValues("gender")}
                onChange={(e) => setValue("gender", e.target.value, { shouldValidate: true })}>
                {validGender.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color='secondary' />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Box display='flex'>
              <FormGroup>
                <FormLabel>Tallas</FormLabel>
                {validSizes.map((size, i) => {
                  const sizeChecked = getValues("sizes").find((s) => s.size === size);

                  return (
                    <Grid key={size} container spacing={2}>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={<Checkbox checked={!!sizeChecked?.size} />}
                          label={size}
                          onChange={() => onChangeSize(size)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          type='number'
                          size='small'
                          value={sizeChecked?.stock ?? 0}
                          onChange={(e) => onChangeStock(parseInt(e.target.value), sizeChecked)}
                          sx={{ width: 70 }}
                          disabled={!sizeChecked?.stock}
                        />
                      </Grid>
                    </Grid>
                  );
                })}
              </FormGroup>
            </Box>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label='Slug - URL'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register("slug", {
                required: "Este campo es requerido",
                validate: (val) => (val.trim().includes(" ") ? "No puede contener espacios" : undefined),
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TagManager getValues={getValues} setValue={setValue} />

            <Divider sx={{ my: 2 }} />

            <Box display='flex' flexDirection='column'>
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button
                color='secondary'
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
                onClick={() => fileInputRef.current?.click()}>
                Cargar imagen
              </Button>
              <input
                ref={fileInputRef}
                style={{ display: "none" }}
                type='file'
                multiple
                accept='image/png, image/png, /image/jpeg, image/jpg'
                onChange={onFileSelected}
              />

              <Chip
                sx={{
                  visibility: getValues("images").length < 2 ? "visible" : "hidden",
                  mb: 2,
                  transition: "0.3 ease all",
                }}
                label='Es necesario al menos 2 imagenes'
                color='error'
                variant='outlined'
                className='fadeIn'
              />

              <Grid container spacing={2}>
                {getValues("images").map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia component='img' className='fadeIn' image={`${img}`} alt={img} />
                      <CardActions>
                        <Button fullWidth color='error' onClick={() => onDeleteImage(img)}>
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = "" } = query;

  let product: IProductSize | null;

  if (slug === "new") {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    tempProduct.images = ["https://via.placeholder.com/150", "https://via.placeholder.com/160"];
    product = tempProduct;
  } else {
    product = await dbProducts.getProductsBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
