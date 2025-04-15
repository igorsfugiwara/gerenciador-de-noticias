import { useState, useEffect } from "react";
import { News } from "../types/News";

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
        }); // Limpa o formulário se for adicionar uma nova notícia
        }
    }, [news]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>{news ? "Editar Notícia" : "Nova Notícia"}</h2>
                <label>Editoria</label>
                <input
                name="editoria"
                placeholder="Editoria"
                value={formData.editoria}
                onChange={handleChange}
                />
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
                <label>Sub-título</label>
                <input
                name="subtitulo"
                placeholder="Subtítulo"
                value={formData.subtitulo}
                onChange={handleChange}
                />
                <label>Data da Publicação</label>
                <input
                name="data_hora_publicacao"
                placeholder="Data e Hora (ex: 2025-04-11 16:44:00)"
                value={formData.data_hora_publicacao}
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
                <textarea
                style={styles.textArea}
                name="conteudo"
                placeholder="Conteúdo HTML"
                value={formData.conteudo}
                onChange={handleChange}
                />

                <div style={styles.buttons}>
                <button onClick={handleSave}>Salvar</button>
                <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}


// Estilos inline para o modal
const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        width: "800px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        gap: "0.2em",
        lineHeight: "24px",
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1rem",
    },
    textArea :{
        height: "200px",
    }
};
