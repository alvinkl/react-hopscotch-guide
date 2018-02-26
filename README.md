# react-hopscotch

React component for quick guide, using Hopscotch library

## Usage

All tour and step options like defined in the Hopscotch’s documentation are available respectively in `Hopscotch` and `Step` components.

## Example

```javascript
import React from 'react'
import { render } from 'react-dom'

import { Hopscotch, Step } from 'react-hopscotch'

render(
    <Hopscotch id="hello-hopscotch" active>
        <div>
            <Step
                title="My Header"
                content="This is the header of my page."
                placement="bottom"
            >
                <h1 id="header">My First Hopscotch Tour</h1>
            </Step>
            <Step
                title="My content"
                content="Here is where I put my content."
                placement="bottom"
            >
                <div id="content">
                    <p>Content goes here...</p>
                </div>
            </Step>
        </div>
    </Hopscotch>,
    document.getElementById('root')
)
```
