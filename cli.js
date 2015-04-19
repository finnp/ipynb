#!/usr/bin/env node

var JSONStream = require('JSONStream')
var md = require('cli-md')

process.stdin
  .pipe(JSONStream.parse('cells.*'))
  .on('data', function(cell) { 
     var output = cell.source.join('').trim()
     if(cell.cell_type === 'code') {
       output = [
         '```python',
         output,  
         '```'
       ].join('\n')
     }
    
    if(output.length > 0) console.log(md(output))
  })