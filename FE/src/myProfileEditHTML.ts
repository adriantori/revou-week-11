async function myProfileEditHTML(postId: string){
    console.log(postId);
    (document.getElementById('postUpdateId') as HTMLInputElement).value = postId;

    let myModal = new bootstrap.Modal(document.getElementById('modalEditPost')!);
    myModal.show();
}