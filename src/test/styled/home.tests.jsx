import { mount } from 'enzyme';
import styled from 'styled-components';
import { find, findAll, enzymeFind } from 'styled-components/test-utils';

const Foo = styled.div`
  color: red;
`;

const Foo2 = styled.div`
  color: ${(props) => props.color};
`;

const wrapper = mount(
  <div>
    <Foo>Bar</Foo>
  </div>
);

findAll(document.body, Foo2); //Node list <HTMLDivElement/>
find(document.body, Foo); // HTMLDivElement | Null
enzymeFind(wrapper, Foo);
