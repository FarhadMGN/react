import React, {Component} from 'react'
import classes from './drawer.module.css'
import Backdrop from "../../UI/backdrop/backdrop";
import { NavLink} from 'react-router-dom'

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose();
    };

    renderLinks(links) {
        return links.map((link, idx) => {
            return (
                <li key={idx}>
                    <NavLink to={link.to}
                             activeClassName={classes.ActiveLink}
                             exact={link.exact}
                             onClick={this.clickHandler}
                    >{link.label}</NavLink>
                    {/*<Route path={'/'+link} exact render={() => <h1>halo {link}</h1>}/>*/}
                </li>
            )
        })
    }

    render() {
        const cls = [
            classes.Drawer
        ];

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }
        const links = [
            {
                to: '/',
                label: 'Quiz List',
                exact: true
            }];

        if (this.props.isAuthenticated) {
            links.push({
                    to: '/quiz-creator',
                    label: 'Create Quiz',
                    exact: false
                });
            links.push({
                to: '/logout',
                label: 'Logout',
                exact: false
            })
        } else {
            links.push({
                to: '/auth',
                label: 'Authorization',
                exact: false
            })
        }
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks(links) }
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null }
            </React.Fragment>
        )
    }
}

export default Drawer;
