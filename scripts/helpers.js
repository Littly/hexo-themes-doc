hexo.extend.helper.register('sidebar', function () {
    var that,
        group,
        groups,
        found,
        pagelink,
        current,
        str,
        items,
        children;

    that = this;
    type = that.page.path.split('/')[0];
    groups = that.site.data.sidebar[type];
    pagelink = that.page.canonical_path.split('/').pop();
    pagetitle = that.page.title;
    str = [];

    that.site.posts.data.sort(function (a, b) {
        return a.order - b.order;
    });

    //page.canonical_path带***.html, page.path不带.
    [].forEach.call(groups, function (group) {
        current = false;
        children = [];
        items = [].filter.call(that.site.posts.data, function (obj, idx, arr) {
            return obj.group === group;
        });
        items.forEach(function (val) {
            if (pagetitle === val.title) {
                current = true;
                children.push('<li class="api_list_item current">');
            }
            else {
                children.push('<li class="api_list_item">');
            }
            children.push('<a href="' + that.url_for(val.path) + '">' + val.title + '</a>');
            children.push('</li>');
        });
        str.push(items[0] ? '<li class="api_list_title' + (current ? ' current' : '') + '"><a href="' + that.url_for(items[0].path) + '">' + group + '</a></li>' : '');
        str.push((current && items[1]) ? children.join('') : '');
    });

    current = false;
    children = [];
    items = [].filter.call(that.site.posts.data, function (obj) {
        return !('group' in obj);
    });

    items.forEach(function (val) {
        if (pagetitle === val.title) {
            current = true;
            children.push('<li class="api_list_item current">');
        }
        else {
            children.push('<li class="api_list_item">');
        }
        children.push('<a href="' + that.url_for(val.path) + '">' + val.title + '</a>');
        children.push('</li>');
    });
    str.push(items[0] ? '<li class="api_list_title' + (current ? ' current' : '') + '"><a href="' + that.url_for(items[0].path) + '">其他组件</a></li>' : '');
    str.push((current && items[1]) ? children.join('') : '');
    return str.join('');
});

hexo.extend.helper.register('is_demo', function () {
    return this.page.path.split('/')[0] === 'demo';
});
hexo.extend.helper.register('is_index', function () {
    return this.page.path.split('/')[0] === 'index.html';
});
