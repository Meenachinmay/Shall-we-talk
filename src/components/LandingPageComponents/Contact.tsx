import React from "react";
import styled from "styled-components";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 50px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 200;
  font-size: 50px;
`;

const Input = styled.input`
  padding: 20px;
  border: none;
  border-radius: 5px;
  background-color: #eeecec;
`;

const TextArea = styled.textarea`
  padding: 20px;
  border: none;
  border-radius: 5px;
  background-color: #eeecec;
`;

const Button = styled.button`
  background-color: #9b2c2c;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  padding: 15px;

  &:hover {
    background-color: white;
    color: #9b2c2c;
  }
`;

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactSVG = styled.img`
  width: 650px;
  height: 450px;
  object-fit: cover;
  background-blend-mode: lighten;
  background-repeat: no-repeat, repeat; 
`;

const Contact: React.FC = () => {
  return (
    <Section id="contactus">
      <Container>
        <Left>
          <Form>
            <Title>お問い合わせ</Title>
            <Input placeholder="お名前" />
            <Input placeholder="メールアドレス" />
            <TextArea rows={10} placeholder="お問い合わせ内容" />
            <Button>ご送信</Button>
          </Form>
        </Left>
        <Right>
          <ContactSVG src="./img/contact.svg" />
        </Right>
      </Container>
    </Section>
  );
};

export default Contact;
