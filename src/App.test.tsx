import React from 'react'

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import App from './App';

describe('<App />', () => {
    test('Footer content to render correctly', () => {
        const wrapper = render(<App />)
        expect(wrapper).toBeTruthy()

        // test footer links
        const links = wrapper.container.querySelectorAll('a')
        expect(links.length).toBe(5)

        const fbLink = links[0]
        expect(fbLink.getAttribute('href')).toBe('https://www.facebook.com/sandra.kaminskinz')

        const twitter = links[1]
        expect(twitter.getAttribute('href')).toBe('https://twitter.com/Sandrakaminski1')

        const tumblr = links[2]
        expect(tumblr.getAttribute('href')).toBe('https://sandrakaminskinz.tumblr.com/')

        const pintrest = links[3]
        expect(pintrest.getAttribute('href')).toBe('https://www.pinterest.com/stylistnz/')

        const insta = links[4]
        expect(insta.getAttribute('href')).toBe('https://www.instagram.com/sandra.kaminski/')

        const text = wrapper.container.querySelectorAll('p')
        expect(text.length).toBe(2)

        const copyRight = text[0]
        expect(copyRight.textContent).toBe(`All content © copyright ${new Date().getFullYear()} ${import.meta.env.VITE_APP_NAME}.`)

        const rightsReserved = text[1]
        expect(rightsReserved.textContent).toBe('All rights reserved.')

    })
});