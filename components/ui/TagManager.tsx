import { Box, Chip, TextField } from "@mui/material";
import { FC, useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

interface Props {
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
}

export const TagManager: FC<Props> = ({ getValues, setValue }) => {
  const [newTagValue, setNewTagValue] = useState<string>("");
  const onNewTag = () => {
    if (newTagValue.trim() !== "") {
      setNewTagValue("");
      const currentTag = getValues("tags");

      if (currentTag.includes(newTagValue.trim().toLowerCase())) {
        return;
      }
      const newTags = [...getValues("tags"), newTagValue.trim().toLowerCase()];
      setValue("tags", newTags);
    }
  };

  const onDeleteTag = (tag: string) => {
    const newTags = getValues("tags").filter((t: any) => t !== tag);
    setValue("tags", newTags, { shouldValidate: true });
  };
  return (
    <>
      <TextField
        label='Tags'
        variant='standard'
        fullWidth
        sx={{ mb: 1 }}
        helperText='Presiona [spacebar] para agregar'
        value={newTagValue}
        onChange={(e) => setNewTagValue(e.target.value)}
        onKeyUp={({ code }) => {
          code === "Space" ? onNewTag() : null;
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0,
          m: 0,
        }}
        component='ul'>
        {getValues("tags")?.map((tag: any) => {
          return (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => onDeleteTag(tag)}
              color='primary'
              size='small'
              sx={{ ml: 1, mt: 1 }}
            />
          );
        })}
      </Box>
    </>
  );
};
