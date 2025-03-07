window.addEventListener('DOMContentLoaded', function () {
    const headings = document.querySelectorAll('main section h2');
    headings.forEach(function (heading) {
        heading.addEventListener('click', function () {
            heading.parentElement.classList.toggle('opened');
        });
    });
});
