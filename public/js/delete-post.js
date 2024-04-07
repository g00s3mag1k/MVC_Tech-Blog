// async function deleteFormHandler(event) {
//     event.preventDefault();

//     const id = window.location.toString().split('/').pop();

//     const response = await fetch(`/api/posts/${id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//     });

//     if (response.ok) {
//         // Redirect to the dashboard after successful deletion
//         document.location.replace('/dashboard');
//     } else {
//         alert('Failed to delete post. Please try again.');
//     }
// }

// document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);


async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')
    [window.location.toString().split('/').length-1];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ post_id: id }), 
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);