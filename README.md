grand-tour
==========

You can find this application useful if you are using charabanc [library](https://github.com/roylines/charabanc) for 
dependency management in your project.
It scans a project folder and finds charabanc.request and charabanc.register expressions and builds
dependency graph from this information.

Usage
-----
```
node dump-nodes.js --route [path to your project that uses charabanc]
```

Example
-------
There is a test project in the test/fixtures/project-fixture folder that we can use as an example.

* Run the dump-nodes script on that folder:

```
node dump-nodes.js --route ./test/fixtures/project-fixture
```
Output
```
Found charabanc file:  test/fixtures/project-fixture/main.js
Found charabanc file:  test/fixtures/project-fixture/utils.js
Found charabanc file:  test/fixtures/project-fixture/lib/accounts.js
Found charabanc file:  test/fixtures/project-fixture/lib/users.js
Done
```

* Go to the web folder and open index.html in your browser. You should see something like this:
![alt tag](http://oi59.tinypic.com/21dg9dt.jpg)

License
-------
The MIT License (MIT)

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
