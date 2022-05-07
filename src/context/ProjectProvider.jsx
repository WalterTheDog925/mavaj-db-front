import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

import clientAxios from '../config/clientAxios';

const ProjectsContext = createContext();

const ProjectsProvider = ({children}) => {
    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return;
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clientAxios('/projects', config);
                setProjects(data);

            } catch (error) {
                console.log(error);
            }
        }
        getProjects();
    }, []);
    

    const showAlert = alert => {
        setAlert(alert);

        setTimeout(() => {
            setAlert({});
        }, 5000);
    }

    const submitProject = async project => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clientAxios.post('/projects', project, config);
            setProjects([...projects, data]);

            setAlert({
                msg: 'Project Successfully created',
                error: false
            });

            setTimeout(() => {
                setAlert({});
                navigate('/projects')
            }, 3000);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                showAlert,
                alert,
                submitProject
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
}

export {
    ProjectsProvider
}

export default ProjectsContext;