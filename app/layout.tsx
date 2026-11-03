import type {Metadata} from 'next';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/500.css';
import '@fontsource/noto-sans-kr/700.css';
import '@fontsource/noto-sans-kr/900.css';
import './globals.css';
export const metadata:Metadata={title:'레슨커넥트AI | 나에게 맞는 음악 선생님',description:'좋아하는 음악과 목표를 바탕으로 나에게 맞는 음악 선생님, 레슨 일정과 공간을 찾아보세요. 레슨커넥트AI 서비스 체험.',robots:{index:false,follow:false},openGraph:{title:'레슨커넥트AI',description:'좋아하는 음악이, 나의 일상이 되도록',locale:'ko_KR',type:'website'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}{process.env.NODE_ENV==='development'&&<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async />}</body></html>;}
