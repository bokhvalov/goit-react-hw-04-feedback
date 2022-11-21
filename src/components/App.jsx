import { Section } from './Section/Section';
import { FeedbackOptions } from './feedback/FeedbackOptios';
import { Statistics } from './feedback/Statistics';
import { Component } from 'react';
import { Notification } from './feedback/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClick = evt => {
    const { id } = evt.target;
    this.setState(prevState => {
      return { [id]: (prevState[id] += 1) };
    });
  };

  countTotalFeedback = () => {
    const stateValues = Object.values(this.state);
    return stateValues.reduce((acc, value) => {
      return acc + value;
    });
  };

  countPositiveFeedbackPercentage = () => {
    const totalFeedback = this.countTotalFeedback();
    return totalFeedback && Math.round((this.state.good / totalFeedback) * 100);
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',

          fontSize: 40,
          color: '#010101',
        }}
      >
        <Section title={'Please leave feedback'}>
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={this.handleClick}
          />
        </Section>

        <Section title={'Statistics'}>
          {this.countTotalFeedback() !== 0 ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback"></Notification>
          )}
        </Section>
      </div>
    );
  }
}
