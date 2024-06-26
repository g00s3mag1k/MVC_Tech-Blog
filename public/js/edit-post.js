async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('input[name="content"]').value.trim();

    const id = window.location.toString().split('/').pop();

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        // Redirect to the specific post page after editing
        document.location.replace(`/post/${id}`);
    } else {
        alert('Failed to edit post. Please try again.');
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);