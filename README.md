# jQuery Constrain Width
A simple plugin to ensure that an element doesn't exceed it's parent's width.

One use case where this is useful - `max-width` is not supported for `<table>` elements across all browsers (FireFox ignores it, Chrome seems to be OK).  So, we can use this plugin to ensure that a table does not break out of it's container.

## Usage

$('.my-element').constrainWidth();