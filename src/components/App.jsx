import { Section } from './Section/Section';
import { FeedbackOptions } from './feedback/FeedbackOptios';
import { Statistics } from './feedback/Statistics';
import { useEffect, useState } from 'react';
import { Notification } from './feedback/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [positivePerc, setPositivePerc] = useState(0);

  const handleClick = evt => {
    const { id } = evt.target;
    switch (id) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;

      default:
        throw new Error('Unexpected event id case');
    }
  };

  useEffect(() => {
    setTotal(good + neutral + bad);
  }, [good, neutral, bad]);

  useEffect(() => {
    const calculatedPosotivePerc = Math.round((good / total) * 100);
    setPositivePerc(calculatedPosotivePerc);
  }, [total,good]);

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
          options={{ good, neutral, bad }}
          onLeaveFeedback={handleClick}
        />
      </Section>

      <Section title={'Statistics'}>
        {total !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePerc}
          />
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </div>
  );
};
