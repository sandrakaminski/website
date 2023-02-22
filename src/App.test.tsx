import React from 'react'

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import App from './App';

describe('<App />', () => {
    test('App mounts properly', () => {
        const wrapper = render(<App />)
        expect(wrapper).toBeTruthy()

        const routes = wrapper.container.querySelectorAll('a')
        expect(routes.length).toBe(5)

 
    })
});