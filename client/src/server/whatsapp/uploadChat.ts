import axios from "axios";

export default async function uploadChat(file: File) {
  const formdata = new FormData();
  formdata.append("file", file);

  const data = axios.post("/api/v1/whatsapp/process", formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
