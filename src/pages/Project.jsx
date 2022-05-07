import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useProjects from '../hooks/useProjects';

import ModalTaskForm from '../components/ModalTaskForm';

const Project = () => {
    const params = useParams();
    const { getProject, project, loading, handleModalTask } = useProjects();

    const [modal, setModal] = useState(false);

    useEffect(() => {
        getProject(params.id);
    }, []);
    
    const { projectName } = project;

    return (
        loading 
        ? (
            <div className='border border-emerald-900 shadow rounded-md p-4 max-w-sm w-full mx-auto'>
                <div className='animate-pulse flex space-x-4'>
                    <div className='rounded-full bg-slate-500 h-10 w-10'></div>
                    <div className='flex-1 space-y-6 py-1'>
                        <div className='h-2 bg-slate-500 rounded'></div>
                        <div className='space-y-3'>
                            <div className='grid grid-cols-3 gap-4'>
                                <div className='h-2 bg-slate-500 rounded col-span-2'></div>
                                <div className='h-2 bg-slate-500 rounded col-span-1'></div>
                            </div>
                            <div className='h-2 bg-slate-500 rounded'></div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
        : (
            <>
                <div className='flex justify-between'>
                    <h1 className='text-zinc-700 font-black text-4xl'>{projectName}</h1>

                    <div className='flex items-center gap-2 text-zinc-200 hover:text-zinc-700 transition-colors'>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-8 w-8" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                        >
                            <path 
                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" 
                            />
                        </svg>
                        <Link
                            to={`/projects/edit/${params.id}`}
                            className='text-xl font-bold uppercase'
                        >Edit</Link>
                    </div>
                </div>

                <button
                onClick={handleModalTask}
                    type='button'
                    className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-emerald-700 text-center mt-3 flex justify-center gap-2 items-center'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    New Task
                </button>

                <ModalTaskForm 
                    modal={modal}
                    setModal={setModal}
                />
            </>
        )
    );
}

export default Project;