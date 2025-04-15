import { Request, Response } from 'express';
import NewsModel from '../models/newsModel';

export const getAllNews = async (_: Request, res: Response) => {
    const news = await NewsModel.find().sort({ data_hora_publicacao: -1 });
    res.json(news);
};

export const getNewsById = async (req: Request, res: Response) => {
    const news = await NewsModel.findOne({ id: Number(req.params.id) });
    if (!news) return res.status(404).json({ error: 'Notícia não encontrada' });
    res.json(news);
};

export const createNews = async (req: Request, res: Response) => {
    const news = new NewsModel(req.body);
    await news.save();
    res.status(201).json(news);
};

export const updateNews = async (req: Request, res: Response) => {
    const updated = await NewsModel.findOneAndUpdate({ id: Number(req.params.id) }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Notícia não encontrada' });
    res.json(updated);
};

export const deleteNews = async (req: Request, res: Response) => {
    const deleted = await NewsModel.findOneAndDelete({ id: Number(req.params.id) });
    if (!deleted) return res.status(404).json({ error: 'Notícia não encontrada' });
    res.status(204).send();
};
