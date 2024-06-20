 document.getElementById('js-navbar-toggle').addEventListener('click', function() {
    var menu = document.getElementById('js-menu');
    menu.classList.toggle('show');
});

document.getElementById('menu-icon').addEventListener('click', function() {
    var navList = document.getElementById('nav-list');
    navList.classList.toggle('active');
});
