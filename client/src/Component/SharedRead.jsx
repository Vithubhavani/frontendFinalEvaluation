import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SharedRead() {
    const { taskId } = useParams();
    const [taske, setTaske] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const resp = await axios.get(`/api/s1/task/public/${taskId}`);
                console.log(resp.data); // Log the task data to check its structure
                setTaske(resp.data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching task', error);
                setLoading(false);
            }
        };
        fetchTask();
    }, [taskId]);

    if (loading) {
        return <p>Loading task details...</p>;
    }

    if (!taske) {
        return <p>Task not found</p>;
    }

    return (
        <div>
            <p>{taske.title}</p>
            <p>{taske.priority}</p>
          
            <p> {taske.checklist?.join(', ')}</p> {/* Fallback to an empty array */}
            <p>{new Date(taske.dueDate).toLocaleDateString()}</p>
        </div>
    );
}
