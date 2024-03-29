import React from 'react'
import { MenuMenu, MenuItem, Menu } from 'semantic-ui-react'
import Link from 'next/link'

const Header = () => {
    return (
        <div>
            <Menu style={{ marginTop: "10px" }} >
                <Link href="/" legacyBehavior>
                    <a className='item'>
                        CrowdCoin
                    </a>
                </Link>

                <MenuMenu position='right'>
                    <Link href="/" legacyBehavior
                    >
                        <a className='item'>
                            Campaigns
                        </a>
                    </Link>

                    <Link href="/campaigns/new" legacyBehavior
                    >
                        <a className='item'>
                            +
                        </a>
                    </Link>
                </MenuMenu>
            </Menu>
        </div>
    )
}

export default Header