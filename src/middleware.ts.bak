import { NextRequest, NextResponse } from 'next/server';

// 中间件处理认证和路由重定向
export function middleware(request: NextRequest) {
  // 处理根路径重定向到主站路由组
  if (request.nextUrl.pathname === '/') {
    // 重定向到实际路由而不是路由组
    return NextResponse.next();
  }

  // 只对管理后台路径应用认证
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // 从环境变量获取用户名和密码
    // 如果没有设置环境变量，使用默认值（仅用于开发环境）
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'password';

    // 获取请求头中的认证信息
    const authHeader = request.headers.get('authorization');

    if (authHeader) {
      // 解析认证信息
      const auth = Buffer.from(authHeader.split(' ')[1], 'base64')
        .toString()
        .split(':');
      const requestUsername = auth[0];
      const requestPassword = auth[1];

      // 验证用户名和密码
      if (requestUsername === username && requestPassword === password) {
        return NextResponse.next();
      }
    }

    // 认证失败，返回401状态码并要求基本认证
    const response = new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });

    return response;
  }

  // 对于非管理后台路径，直接放行
  return NextResponse.next();
}

// 配置中间件应用的路径
export const config = {
  matcher: [
    // 只匹配管理后台路径
    '/admin/:path*',
  ],
};
