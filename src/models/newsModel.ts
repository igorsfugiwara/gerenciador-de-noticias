import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  editoria: { type: String, required: true },
  url: { type: String, required: true },
  titulo: { type: String, required: true },
  subtitulo: { type: String },
  data_hora_publicacao: { type: String, required: true },
  imagem: { type: String },
  imagem_thumb: { type: String },
  conteudo: { type: String, required: true }
});

const NewsModel = mongoose.model('News', newsSchema);

export default NewsModel;
