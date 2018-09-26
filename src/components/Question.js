import React,{Component} from 'react';
import { Progress,CardImg,Button } from 'reactstrap';
import {connect} from 'react-redux'
import './css/Question.css'
import { handleAnswerQuestion } from '../actions/Questions'
import NotFound from './NotFound'
import { Link } from 'react-router-dom'

class Question extends Component{
state={
    author:false
}

handleMove = (qid, answer) => {
        this.props.dispatch(handleAnswerQuestion(qid, answer));
    }
    render(){
      const { id, authedUser, users, questions } = this.props

      if(!questions[id]) {
        return <NotFound />
      }

      if(!users[authedUser].answers[id]) {
        return (
          <ul>
            <Link to={`/question/${id}`} key={id}>
                    <li key={id}>
                      <span>{questions[id].optionOne.text}</span>
                      <Button className="optA" onClick={() => this.handleMove(id, 'optionOne')}>Vote A</Button><br/><br/>
                          <br/><br/>
                      <span>{questions[id].optionTwo.text}</span>

                     <Button className="optB" onClick={() => this.handleMove(id, 'optionTwo')}>Vote B</Button><br/><br/>
                    </li>
            </Link>
          </ul>
        );
      }

      const voteOne = Math.floor((questions[id].optionOne.votes.length/(questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length))*100)
      const voteTwo = Math.floor((questions[id].optionTwo.votes.length/(questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length))*100)


      return(
          <div>
              <h1>Would You Rather !!!!</h1>
                <div className="myText">Asked By: {users[questions[id].author].name}</div>
              <CardImg className='imgques' src={users[questions[id].author].avatarURL} alt="Card image cap" />
              <div className="text-center">
                {questions[id].optionOne.text}: {questions[id].optionOne.votes.length} Vote || Percentage: {voteOne}%
                {users[authedUser].answers[id] === 'optionOne' ? '  <-- Your Vote' : ' '}
              </div>

              <Progress className="opt1" value={voteOne} />
              <div className="text-center">
                {questions[id].optionTwo.text}: {questions[id].optionTwo.votes.length} Vote || Percentage: {voteTwo}%
                {users[authedUser].answers[id] === 'optionTwo' ? '  <-- Your Vote' : ' '}
              </div>

              <Progress className="opt2" value={voteTwo} />
          </div>
           )
         }
     }
function mapStateToProps({ authedUser, users, questions }, props){
    const { id } = props.match.params

    return {
        id,
        authedUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(Question)
