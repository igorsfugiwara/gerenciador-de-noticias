import { useState, useEffect } from "react";
import { News } from "../types/News";
import "../styles/NewsFormModal.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

type NewsFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (news: News) => void;
    news?: News | null;
};

export default function NewsFormModal({ isOpen, onClose, onSave, news }: NewsFormModalProps) {
    const [formData, setFormData] = useState<News>({
        id: Date.now(),
        editoria: "",
        url: "",
        titulo: "",
        subtitulo: "",
        data_hora_publicacao: "",
        imagem: "",
        imagem_thumb: "",
        conteudo: "",
    });

    useEffect(() => {
        if (news) {
        setFormData(news); // Preenche o formulário com os dados da notícia se estiver editando
        } else {
        setFormData({
            id: Date.now(),
            editoria: "",
            url: "",
            titulo: "",
            subtitulo: "",
            data_hora_publicacao: "",
            imagem: "",
            imagem_thumb: "",
            conteudo: "",
        });
    }
}, [news]);

    function formatForInput(dateStr: string) {
        if (!dateStr) return "";
        const [date, time] = dateStr.split(" ");
        return `${date}T${time}`;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
    
        let newValue = value;
    
        // Se for o campo de data, transforma o T em espaço
        if (name === "data_hora_publicacao") {
        newValue = value.replace("T", " ");
        }
    
        setFormData((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleSave = async () => {
        try {
            const isEdit = !!formData._id;
            const url = isEdit
                ? `http://localhost:5000/noticias/${formData._id}`
                : 'http://localhost:5000/noticias';
        
            const response = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        
            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                const errorText = contentType?.includes('application/json')
                ? (await response.json()).error
                : await response.text(); // pega o HTML da resposta
        
                throw new Error(errorText || 'Erro ao salvar a notícia');
            }
        
            const savedNews = await response.json();
            onSave(savedNews);
            onClose();
        } catch (error) {
        console.error('Erro ao salvar:', error);
        alert(`Erro ao salvar a notícia: ${error.message}`);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir esta notícia?');
        if (!confirmDelete) return;
        try {
            const response = await fetch(`http://localhost:5000/noticias/${formData._id}`, {
                method: 'DELETE',
            });
        
            if (!response.ok) {
                throw new Error('Erro ao excluir a notícia');
            }
        
            onSave(null); // ou chama uma função onDelete se tiver
            onClose();
        } catch (error) {
            console.error('Erro ao excluir:', error);
            alert(`Erro ao excluir a notícia: ${error.message}`);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="modal">
                <h2>{news ? "Editar Notícia" : "Nova Notícia"}</h2>
                <div className="bloco">
                    <div className="bloco-interno">
                        <label>Editoria</label>
                        <input
                            name="editoria"
                            placeholder="Editoria"
                            value={formData.editoria}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="bloco-interno">
                        <label>Data da Publicação</label>
                        <input
                            type="datetime-local"
                            name="data_hora_publicacao"
                            value={formatForInput(formData.data_hora_publicacao)}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <label>URL</label>
                <input
                    name="url"
                    placeholder="URL"
                    value={formData.url}
                    onChange={handleChange}
                />
                <label>Título</label>
                <input
                    name="titulo"
                    placeholder="Título"
                    value={formData.titulo}
                    onChange={handleChange}
                />
                <label>Subtítulo</label>
                <input
                    name="subtitulo"
                    placeholder="Subtítulo"
                    value={formData.subtitulo}
                    onChange={handleChange}
                />
                <label>Imagem</label>
                <input
                    name="imagem"
                    placeholder="URL da imagem"
                    value={formData.imagem}
                    onChange={handleChange}
                />
                <label>Imagem Thumb</label>
                <input
                    name="imagem_thumb"
                    placeholder="URL da imagem (thumb)"
                    value={formData.imagem_thumb}
                    onChange={handleChange}
                />
                <label>Notícia</label>
                <CKEditor
  editor={ClassicEditor}
  data={formData.conteudo}
  onChange={(_, editor) => {
    const data = editor.getData();
    setFormData((prev) => ({ ...prev, conteudo: data }));
  }}
/>

                <div className="buttons">
                <button className="cancel-button" onClick={onClose}>Cancelar</button>
                {formData._id && <button className="delete-button" onClick={handleDelete}>Excluir</button>}
                <button className="save-button" onClick={handleSave}>Salvar</button>
                </div>
            </div>
        </div>
    );
}