<?php

function test_func() {
    return 'OK';
}

/**
 * 将当前请求的路由名称转换为CSS类名称，用于针对页面做样式定制
 *
 * @return void
 */
function route_class()
{
    return str_replace('.', '-', Route::currentRouteName());
}