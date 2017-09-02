# netrat

[![NPM Version](https://img.shields.io/npm/v/netrat.svg)](https://www.npmjs.com/package/netrat)
![node](https://img.shields.io/node/v/netrat.svg)
[![Dependency Status](https://david-dm.org/roccomuso/netrat.png)](https://david-dm.org/roccomuso/netrat)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
<span class="badge-patreon"><a href="https://patreon.com/roccomuso" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>

> Damn easy multiplatform Node.js RAT generator

An easy tool to generate configurable backdoors that runs on Windows, Mac and Linux. Shells are upgradable to **Meterpreter**!

**Work in progress...** *do not use it yet*.

## Install

    $ git clone https://github.com/roccomuso/netrat.git
    $ npm install

## Usage

    $ npm start

It will start the building procedure that lets you customize your backdoor.

Under the hood we use [pkg](https://github.com/zeit/pkg) to build the executable.

To reduce the build size up to 4 times I recommend you to compress your binary file.
NetRAT provides already a basic compression.

## Compression

Compression is possible thanks to [UPX](https://github.com/roccomuso/upx).

## Cross-platform commands

Commands starting with `cash` are backed with [cash](https://github.com/dthree/cash), providing an easy solution for simple Unix-like, cross-platform commands.

## Debug

To enable debug, set the env var, `DEBUG=netrat`.

## Core modules

| Name | Build | Description |
|------|-------|-------------|
| [netcat](https://github.com/roccomuso/netcat) | [![Build Status](https://travis-ci.org/roccomuso/netcat.svg?branch=master)](https://travis-ci.org/roccomuso/netcat) | Netcat client and server modules written in pure Javascript for Node.js |
| [cash](https://github.com/dthree/cash) | [![Build Status](https://travis-ci.org/dthree/cash.svg)](https://travis-ci.org/dthree/cash/) | Cross-platform Linux commands in ES6 |
| [pkg](https://github.com/zeit/pkg) | [![Build Status](https://travis-ci.org/zeit/pkg.svg?branch=master)](https://travis-ci.org/zeit/pkg) | Package your Node.js project into an executable |

## Author

Rocco Musolino ([@roccomuso](https://twitter.com/roccomuso))

## License

MIT
