export const InvitationsList = () => {
    const projects = [
        { id: 1, name: 'Project 1', description: 'This is a sample project.' },
        { id: 2, name: 'Project 2', description: 'Another sample project.' },
        // Add more projects here
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">My Projects</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.id} className="mb-4">
                        <h2 className="text-2xl font-semibold">{project.name}</h2>
                        <p>{project.description}</p>
                        <div className="flex space-x-4 mt-2">
                            <Button className="bg-green-500 hover:bg-green-600 text-white">Accept</Button>
                            <Button className="bg-red-500 hover:bg-red-600 text-white">Reject</Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectsPage;