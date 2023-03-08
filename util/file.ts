import fs from "fs";

export const deleteFile = (filepath: string) => {
  fs.unlink(filepath, (err) => {
    if (err) {
      throw err;
    }
  });
};
