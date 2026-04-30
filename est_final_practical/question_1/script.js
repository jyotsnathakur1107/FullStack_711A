async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const users = await response.json();

       
        users.slice(0, 5).forEach(user => {
            console.log(user.name);
        });

    } catch (error) {
        console.error('Error fetching users:', error);
    }
}


getUsers();