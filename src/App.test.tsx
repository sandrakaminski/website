import React from 'react'

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import App from './App';

describe('<App />', () => {
    test('Footer links', () => {
        const wrapper = render(<App />)
        expect(wrapper).toBeTruthy()

        const links = wrapper.container.querySelectorAll('a')
        expect(links.length).toBe(5)

        const fbLink = links[0]
        expect(fbLink.getAttribute('href')).toBe('https://www.facebook.com/sandra.kaminskinz')
    })
});