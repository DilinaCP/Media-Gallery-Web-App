import archiver from "archiver";
import axios from "axios";

export const downloadZip = async (req, res) => {
  const { images } = req.body;

  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ message: "No images provided" });
  }

  res.setHeader("Content-Type", "application/zip");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=gallery-images.zip"
  );

  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.pipe(res);

  try {
    for (let i = 0; i < images.length; i++) {
      const imageUrl = images[i];

      const response = await axios.get(imageUrl, {
        responseType: "stream",
      });

      archive.append(response.data, {
        name: `image-${i + 1}.jpg`,
      });
    }

    await archive.finalize();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create ZIP" });
  }
};
