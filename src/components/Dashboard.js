import React,{Component} from 'react'
import {TabContent, TabPane,Nav,NavItem,NavLink,Button} from 'reactstrap'
import {connect} from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

class Dashboard extends Component{
    state={
        activeTab:'1'
    }




toggle(tab){
    if(this.state.activeTab !== tab){
        this.setState({
            activeTab:tab
        })
    }
}


    render(){
        const { Allanswered, Allunanswered, questions } = this.props

        return(
            <div>
    <Nav className='tab'>
        <NavItem>
            <NavLink
                className={classnames({activeNav: this.state.activeTab === '1'})}
                style={{cursor:'pointer'}}
                onClick={()=>{this.toggle('1')}}
                    >Unanswered</NavLink>

            </NavItem>
        <NavItem>
            <NavLink
                className={classnames({activeNav: this.state.activeTab=== '2'})}
                style={{cursor:'pointer'}}
                onClick={()=>{this.toggle('2')}}>Answered
                    </NavLink>

            </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId='1'>
                <ul>
             {Allunanswered.map(id=>
              <Link to={`/question/${id}`} key={id}>
                  <li key={id}>
                    <span>{questions[id].optionOne.text}</span>
                        <br/><br/>
                    <span>{questions[id].optionTwo.text}</span>
                    <br/><br/>
                   <Button className="opt">Click To Vote</Button><br/><br/>
                  </li>
              </Link>
              )}
                </ul>
                </TabPane>

            <TabPane tabId='2'>
                <ul>
                {Allanswered.map(id=>
                <li key={id}>
                    <span>{questions[id].optionOne.text}</span><br/>
                    <span>{questions[id].optionTwo.text}</span><br/>
                     <Link to={`/question/${id}`}><Button className="optB">View Poll</Button></Link><br/><br/>
                </li>
              )}
                </ul>
                </TabPane>
            </TabContent>
            </div>
        )
    }
}
function mapStateToProps({questions,authedUser}){
    const answered=Object.values(questions).filter(question => question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
    const unanswered=Object.values(questions).filter(question=> !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser))
    return{
          Allunanswered: Object.values(unanswered)
            .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id),
        Allanswered: Object.values(answered)
            .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id),
        questions,
        authedUser
    }

    }
export default connect(mapStateToProps)(Dashboard)
