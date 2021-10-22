## Текстовый

```jsx
import styled from 'styled-components';

const Wrapper = styled.div`
  & + & {
    margin: 20px 0 0
  }
`;

<>
  <Wrapper><Input type="text" name="text" label="Label" placeholder="Placeholder 1" /></Wrapper>
  <Wrapper><Input type="text" name="text" label="Label" placeholder="Placeholder 2" inputSize="medium" /></Wrapper>
  <Wrapper><Input type="text" name="text" label="Label" placeholder="Placeholder 3" inputSize="small" /></Wrapper>
  <Wrapper><Input type="text" name="text" label="Label" placeholder="Placeholder 4" shapeType="underlined" /></Wrapper>
  <Wrapper><Input type="text" name="text" label="Label" placeholder="Placeholder 5" shapeType="underlined" inputSize="medium" /></Wrapper>
  <Wrapper><Input type="text" name="text" label="Label" placeholder="Placeholder 6" shapeType="underlined" inputSize="small" /></Wrapper>
</>
```

## Пароль

```jsx
import styled from 'styled-components';

const Wrapper = styled.div`
  & + & {
    margin: 20px 0 0
  }
`;

<>
  <Wrapper><Input type="password" name="password" label="Password 1" /></Wrapper>
  <Wrapper><Input type="password" name="password" label="Password 2" inputSize="medium"/></Wrapper>
  <Wrapper><Input type="password" name="password" label="Password 3" inputSize="small"/></Wrapper>
  <Wrapper><Input type="password" name="password" label="Password 4" shapeType="underlined" /></Wrapper>
  <Wrapper><Input type="password" name="password" label="Password 5" shapeType="underlined" inputSize="medium"/></Wrapper>
  <Wrapper><Input type="password" name="password" label="Password 6" shapeType="underlined" inputSize="small"/></Wrapper>
</>
```

## Со значением

```jsx
import styled from 'styled-components';

const Wrapper = styled.div`
  & + & {
    margin: 20px 0 0
  }
`;

<>
  <Wrapper><Input type="text" name="value" label="Со значением 1" defaultValue="Коронавирус" /></Wrapper>
  <Wrapper><Input type="text" name="value" label="Со значением 2" defaultValue="Коронавирус" inputSize="medium" /></Wrapper>
  <Wrapper><Input type="text" name="value" label="Со значением 3" defaultValue="Коронавирус" inputSize="small" /></Wrapper>
  <Wrapper><Input type="text" name="value" label="Со значением 4" defaultValue="Коронавирус" shapeType="underlined" /></Wrapper>
  <Wrapper><Input type="text" name="value" label="Со значением 5" defaultValue="Коронавирус" inputSize="medium" shapeType="underlined" /></Wrapper>
  <Wrapper><Input type="text" name="value" label="Со значением 6" defaultValue="Коронавирус" inputSize="small" shapeType="underlined" /></Wrapper>
</>
```

## С подсказкой

```jsx
import styled from 'styled-components';

const Wrapper = styled.div`
  & + & {
    margin: 20px 0 0
  }
`;

<>
  <Wrapper><Input type="text" name="hint" label="С подсказкой 1" hint="Здесь могла бы быть ваша подсказка" /></Wrapper>
  <Wrapper><Input type="text" name="hint" label="С подсказкой 2" hint="Здесь могла бы быть ваша подсказка" inputSize="medium" /></Wrapper>
  <Wrapper><Input type="text" name="hint" label="С подсказкой 3" hint="Здесь могла бы быть ваша подсказка" inputSize="small" /></Wrapper>
  <Wrapper><Input type="text" name="hint" label="С подсказкой 4" hint="Здесь могла бы быть ваша подсказка" shapeType="underlined" /></Wrapper>
  <Wrapper><Input type="text" name="hint" label="С подсказкой 5" hint="Здесь могла бы быть ваша подсказка" inputSize="medium" shapeType="underlined" /></Wrapper>
  <Wrapper><Input type="text" name="hint" label="С подсказкой 6" hint="Здесь могла бы быть ваша подсказка" inputSize="small" shapeType="underlined" /></Wrapper>
</>
```

## С ошибкой

```jsx
import styled from 'styled-components';

const Wrapper = styled.div`
  & + & {
    margin: 20px 0 0
  }
`;
<>
  <Wrapper><Input type="text" name="error" label="Label 1" hint="Error text" defaultValue="Text" error /></Wrapper>
  <Wrapper><Input type="text" name="error" label="Label 2" hint="Error text" defaultValue="Text" error inputSize="medium" /></Wrapper>
  <Wrapper><Input type="text" name="error" label="Label 6" hint="Error text" defaultValue="Text" error shapeType="underlined" inputSize="small" /></Wrapper>
  <Wrapper><Input type="text" name="error" label="Label 3" hint="Error text" defaultValue="Text" error inputSize="small" /></Wrapper>
  <Wrapper><Input type="text" name="error" label="Label 4" hint="Error text" defaultValue="Text" error shapeType="underlined" /></Wrapper>
  <Wrapper><Input type="text" name="error" label="Label 5" hint="Error text" defaultValue="Text" error shapeType="underlined" inputSize="medium" /></Wrapper>
</>
```

## Disabled

```jsx
import styled from 'styled-components';

const Wrapper = styled.div`
  & + & {
    margin: 20px 0 0
  }
`;
<>
  <Wrapper><Input type="text" name="disabled" label="Disabled 1" defaultValue="Disabled" readOnly hint="Подсказка" /></Wrapper>
  <Wrapper><Input type="text" name="disabled" label="Disabled 2" defaultValue="Disabled" readOnly hint="Подсказка" inputSize="medium" /></Wrapper>
  <Wrapper><Input type="text" name="disabled" label="Disabled 3" placeholder="Placeholder" readOnly hint="Подсказка" inputSize="small" /></Wrapper>
  <Wrapper><Input type="text" name="disabled" label="Disabled 4" defaultValue="Disabled" readOnly hint="Подсказка" shapeType="underlined" /></Wrapper>
  <Wrapper><Input type="text" name="disabled" label="Disabled 5" defaultValue="Disabled" readOnly hint="Подсказка" shapeType="underlined" inputSize="medium" /></Wrapper>
  <Wrapper><Input type="text" name="disabled" label="Disabled 6" placeholder="Placeholder" readOnly hint="Подсказка" shapeType="underlined" inputSize="small" /></Wrapper>
</>
```
