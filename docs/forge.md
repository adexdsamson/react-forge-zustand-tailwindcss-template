## Forge Usage 
# Follow the steps below to use the forge form management library and do not modify the actual `forge` file.

### 1. Basic usage 
```js
import { useForge, Forge } from './forge';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    ...
});


const Component = () => {
    const { control } = useForge({
        resolver: yupResolver(schema),
        defaultValue: {}
    })

    ...

    const onSubmit = (data) => {
        console.log(data);
    }
    
    return (
        <Forge
            control={control}
            onSubmit={onSubmit}
            isNative
        >
            <div>
                <label>Name</label>
                <input name="name" type="text" />
            </div>
        </Forge>
    )
}
```

### 2. Using Custom component
```js
import { useForge, Forge } from './forge';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from './components/input';
import { Select } from './components/select';
import { Checkbox } from './components/checkbox';


const schema = yup.object().shape({
    ...
});

const Component = () => {
    const { control } = useForge({
        resolver: yupResolver(schema),
        defaultValue: {}
    })

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Forge
            control={control}
            onSubmit={onSubmit}
            isNative
        >
            <div>
                <label>Name</label>
                <Input name="name" type="text" />
            </div>
            <div>
                <label>Select</label>
                <Select name="select" options={[{
                    label: 'Option 1',
                    value: '1',
                }]} />
            </div>
            <div>
                <label>Checkbox</label>
                <Checkbox name="checkbox" />
            </div>
        </Forge>
    )
}
```

# 3. Using Forger component with custom props
```js
import { useForge, Forge, Forger } from './forge';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from './components/input';
import { Select } from './components/select';
import { Checkbox } from './components/checkbox';

const schema = yup.object().shape({
    ...
});

const Component = () => {
    const { control } = useForge({
        resolver: yupResolver(schema),
        defaultValue: {}
    })

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Forge
            control={control}
            onSubmit={onSubmit}
        >
            <Forger
                name="name"
                type="text"
                component={Input}
            />

            <Forger name="select" type="select" component={Select} options={[{
                label: 'Option 1',
                value: '1',
            }]} />

            <Forger name="checkbox" type="checkbox" component={Checkbox} />
        </Forger>
    )
}

```
# 4. Using Forger component with native html element

```js
import { useForge, Forge, Forger } from './forge';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    ...
});

const Component = () => {
    const { control } = useForge({
        resolver: yupResolver(schema),
        defaultValue: {}
    })

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Forge
            control={control}
            onSubmit={onSubmit}
        >
            <Forger
                name="name"
                type="text"
                component="input"
            />

            <Forger name="select" type="select" component="select" options={[{
                label: 'Option 1',
                value: '1',
            }]} />

            <Forger name="checkbox" type="checkbox" component="checkbox" />
        </Forge>
    )

}
```


# 5. Using forge on wizard form
```js
import { useForge, Forge, Forger } from './forge';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from './components/input';
import { Select } from './components/select';
import { Checkbox } from './components/checkbox';

const schemaOne = yup.object().shape({
    ...
});


const Component = () => {
    const { control } = useForge({
        resolver: yupResolver(schemaOne),
        defaultValue: {}
    })

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Forge
            control={control}
            onSubmit={onSubmit}
            isWizard={true}
        >
            <WizardComponentOne />
            <WizardComponentTwo />
        </Forge>
    )
}

const WizardComponentOne = () => {
   return (
        <>
            <Forger
                name="name"
                type="text"
                component="input"
            />
             <button data-wizard-nav="previous">Previous</button>
        <button data-wizard-nav="next">Next</button>
        </>
   )

}

const WizardComponentTwo = () => {
   return (
        <>
            <Forger
                name="name"
                type="text"
                component="input"
            />

             <button data-wizard-nav="previous">Previous</button>
        <button data-wizard-nav="next">Next</button>
        </>
   )
}


```

# 7. Using fields props on useForge
 - Note: this method does not work for wizard form

```js
import { useForge } from './forge';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from './components/input';
import { Select } from './components/select';
import { Checkbox } from './components/checkbox';

const schema = yup.object().shape({
    ...
});

const Component = () => {
    const { control } = useForge({
        resolver: yupResolver(schema),
        fields: [
            {
                name: "name",
                type: 'text',
                component: 'input',
            },
            {
                name: "select",
                type: 'select',
                component: 'select',
                options: [{
                    label: 'Option 1',
                    value: '1',
                }]
            },
            {
                name: "checkbox",
                type: 'checkbox',
                component: 'checkbox',
            },
            {
                name: "customSelect",
                component: Select,
                options: [{
                    label: 'Option 1',
                    value: '1',
                }]
            },
            {
                name: "customCheckbox",
                component: Checkbox,
            }
        ]
    })


    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Forge
            control={control}
            onSubmit={onSubmit}
        />
    )
}
```
