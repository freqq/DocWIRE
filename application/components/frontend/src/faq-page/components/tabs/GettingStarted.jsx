import React from 'react';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';

const GettingStartedWrapper = styled.div.attrs({ className: 'getting-started-wrapper' })`
  margin-top: 30px;
`;

const TabTitle = styled.div.attrs({ className: 'tab-title' })`
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
`;

const TabDescription = styled.div.attrs({ className: 'tab-description' })`
  font-size: 12px;
  font-weight: 100;
  text-align: center;
  width: 60%;
  margin: 0 auto;
`;

const Answer = styled.div.attrs({ className: 'answer' })`
  font-size: 12px;
  font-weight: 100;
  margin-top: 10px;
`;

const QuestionsWrapper = styled.div.attrs({ className: 'questions-wrapper' })`
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: 35vh;
  width: 60%;
  margin: 0 auto;
`;

const GettingStarted = () => (
  <GettingStartedWrapper>
    <TabTitle>Getting Started</TabTitle>
    <TabDescription>All the basic questions are available down below.</TabDescription>
    <QuestionsWrapper>
      <Collapsible trigger="How to start?" open>
        <Answer>
          This is the collapsible content. It can be any element or React component you like. It can
          even be another Collapsible component. Check out the next section!
        </Answer>
      </Collapsible>
      <Collapsible trigger="Is there any way to not give my personal data?">
        <Answer>
          This is the collapsible content. It can be any element or React component you like. It can
          even be another Collapsible component. Check out the next section!
        </Answer>
      </Collapsible>
      <Collapsible trigger="Did i do anything wrong when i gave wrong answers?">
        <Answer>
          This is the collapsible content. It can be any element or React component you like. It can
          even be another Collapsible component. Check out the next section!
        </Answer>
      </Collapsible>
      <Collapsible trigger="How to start?">
        <Answer>
          This is the collapsible content. It can be any element or React component you like. It can
          even be another Collapsible component. Check out the next section!
        </Answer>
      </Collapsible>
      <Collapsible trigger="Is there any way to not give my personal data?">
        <Answer>
          This is the collapsible content. It can be any element or React component you like. It can
          even be another Collapsible component. Check out the next section!
        </Answer>
      </Collapsible>
      <Collapsible trigger="Did i do anything wrong when i gave wrong answers?">
        <Answer>
          This is the collapsible content. It can be any element or React component you like. It can
          even be another Collapsible component. Check out the next section!
        </Answer>
      </Collapsible>
    </QuestionsWrapper>
  </GettingStartedWrapper>
);

export default GettingStarted;
