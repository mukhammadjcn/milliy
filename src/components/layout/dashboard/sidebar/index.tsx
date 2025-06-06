import { MenuOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import {
  Category2,
  Chart1,
  Cup,
  Firstline,
  Instagram,
  MessageQuestion,
  Messages,
  Profile2User,
  Security,
} from 'iconsax-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from 'src/app/slices/authSlice';
import { useAppDispatch, useTypedSelector } from 'src/app/store';
import { LogoutSvg } from 'src/components/icons';
import images from 'src/constants/images';
import { colors } from 'src/constants/theme';
import MenuItem from './components/MenuItem';
import './sidebar.scss';

function LayoutSidebar() {
  const { role } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const list = [
    {
      label: 'Statistikalar',
      link: '/',
      icon: <Chart1 size="20" color={colors.white} />,
    },
    {
      label: "G'olibni aniqlash",
      link: '/determine_winner',
      icon: <Cup size="20" color={colors.white} />,
    },
    {
      label: "G'oliblar",
      link: '/winners',
      icon: <Security size="20" color={colors.white} />,
    },
    {
      label: 'Foydalanuvchilar',
      link: '/users',
      icon: <Profile2User size="20" color={colors.white} />,
    },
    {
      label: 'Skanerlar',
      link: '/scans',
      icon: <Category2 size="20" color={colors.white} />,
    },
    {
      label: 'QR-kodlar',
      link: '/qr_codes',
      icon: <Firstline size="20" color={colors.white} />,
    },
    {
      label: 'Xabarlar',
      link: '/messages',
      icon: <Messages size="20" color={colors.white} />,
    },
    {
      label: 'Savol javoblar',
      link: '/questions',
      icon: <MessageQuestion size="20" color={colors.white} />,
    },
    {
      label: 'Instagram havolalari',
      link: '/links',
      icon: <Instagram size="20" color={colors.white} />,
    },
  ];

  const managerList = [
    {
      label: 'Xabarlar',
      link: '/messages',
      icon: <Messages size="20" color={colors.white} />,
    },
    {
      label: 'Savol javoblar',
      link: '/questions',
      icon: <MessageQuestion size="20" color={colors.white} />,
    },
    {
      label: 'Instagram havolalari',
      link: '/links',
      icon: <Instagram size="20" color={colors.white} />,
    },
  ];

  return (
    <div className={`sidebar ${!open ? 'sidebar-mini' : ''}`}>
      <div className="sidebar-top">
        <div className="sidebar-title">
          <img draggable={false} src={images.logo} alt="error img" />
          <p>Milliydaman</p>
          <Button
            onClick={() => setOpen(!open)}
            style={{ marginRight: '-48px' }}
            icon={<MenuOutlined style={{ color: colors.white }} />}
            type="link"
          ></Button>
        </div>
        <div className="menu">
          {(role === 'admin' ? list : managerList)?.map((item) => (
            <MenuItem key={item.link} {...item} />
          ))}
        </div>
      </div>
      <div className="sidebar-footer">
        <Popconfirm
          title="Tizimdan chiqishni tasdiqlaysizmi?"
          onConfirm={() => {
            dispatch(logout());
            navigate('/');
          }}
          okText="Ha"
          cancelText="Yo'q"
          cancelButtonProps={{ danger: true }}
        >
          <div className={`sidebar-footer-button `}>
            <LogoutSvg />

            <div className="text">Tizimdan chiqish</div>
          </div>
        </Popconfirm>
      </div>
    </div>
  );
}

export default LayoutSidebar;
