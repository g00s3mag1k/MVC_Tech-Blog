// async function commentFormHandler(event) {
//     event.preventDefault();

//     const comment_text = document.querySelector('input[name="comment-body"]').value.trim();

//     const post_id = window.location.toString().split('/').pop();

//     if (comment_text) {
//         const response = await fetch('/api/comments', {
//             method: 'POST',
//             body: JSON.stringify({ post_id, comment_text }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (response.ok) {
//             document.location.reload();
//             // Add the new comment dynamically without reloading the page
//             // You can append the new comment to the existing comments section
//             // Example: document.querySelector('.comments-section').append(newCommentElement);
//         } else {
//             alert('Failed to add comment. Please try again.');
//             document.querySelector('#comment-form').style.display = 'block';
//         }
//     }
// }

// document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);


async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('input[ name="comment-body"]').value.trim();

    const post_id = window.location.toString().split('/')
    [window.location.toString().split('/').length-1];
    
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, comment_text }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
            document.querySelector('#comment-form').computedStyleMap.display = 'block';
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);