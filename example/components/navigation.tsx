import Link from 'next/link';
import * as React from "react";
import { useSiteState } from '../hooks/useSiteState';
import { StyledNavigation, StyledNavigationLink } from './navigation.styles';

interface INavigation {
}

const Navigation: React.FC<INavigation> = (props) => {
    const { setOverlayActive, navOpen, setNavOpen } = useSiteState();

    const handleClick = () => {
        setNavOpen(!navOpen);
        setOverlayActive(!navOpen);
    }

    return (
        <StyledNavigation open={navOpen} onClick={() => handleClick()}>
            <StyledNavigationLink><Link href={'/'}>Home</Link></StyledNavigationLink>
            <StyledNavigationLink><Link href={'/cursor-demo'}>Cursor Demo</Link></StyledNavigationLink>
            <StyledNavigationLink><Link href={'/tracked-element-demo'}>Tracked Element Demo</Link></StyledNavigationLink>
        </StyledNavigation>
    )
}

export default Navigation;