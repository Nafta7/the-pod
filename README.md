# THE POD

## Overview

> #### "Astronomy Picture of the Day ([APOD](https://apod.nasa.gov)) is a website provided by NASA. Each day a different image or photograph of our universe is featured, along with a brief explanation written by a professional astronomer."
>
> [Wikipedia](https://en.wikipedia.org/wiki/Astronomy_Picture_of_the_Day)

**The Pod** is a reimagining of the APOD for the modern web.

## Features

- Beautiful display of imagery.
- Mobile-friendly.
- Learn more about the picture using the **Details** button.
- Navigate between days using **Previous** and **Next** buttons.
- Let lady luck pick a day for you using the **Shuffle** button.
- Click on the image to have a complete view of the picture.

## Development

Download the repository:

```bash
git clone https://github.com/nefla/the-pod
```

Install the dependencies:

```bash
cd the-pod
npm install
```

Add your API key to the **credentials** file:

```bash
cp credentials-template.json credentials.json
```

Start working!

```bash
npm start
```

## License

The Pod is open-source and is distributed under the terms and conditions of the BSD-2 license.

## Third-party resources

[Material icons](https://github.com/google/material-design-icons/) - Provides the icons. License: Apache 2.0

[NASA APOD API](https://api.nasa.gov/api.html#apod) - Provides the data.
