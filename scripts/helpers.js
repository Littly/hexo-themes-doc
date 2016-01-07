hexo.extend.helper.register('sidebar', function () {
    var that,
        arr,
        sidebar,
        type,
        i,
        j,
        str,
        found,
        pagelink,
        children;
    that = this;
    arr = [];
    type = that.page.path.split('/')[0];
    sidebar = that.site.data.sidebar[type];
    pagelink = that.page.canonical_path.split('/').pop();
    str = [];

    //page.canonical_path带***.html, page.path不带.

    for (i in sidebar) {
        found = false;
        children = [];
        sidebar[i].forEach(function (obj) {
            // obj = [name, href]
            if (obj[1] === pagelink) {
                children.push('<li class="api_list_item current">');
                found = true;
            }
            else {
                children.push('<li class="api_list_item">');
            }
            children.push('<a href="' + obj[1] + '">' + obj[0] + '</a>');
            children.push('</li>');
        })
        str.push('<li class="api_list_title' + (found ? ' current' : '') + '"><a href="' + sidebar[i][0][1] + '">' + i + '</strong></li>');
        str.push(found ? children.join('') : '');
    }
    return str.join('');

});
