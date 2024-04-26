# Codegrade Config

## Setup Tab

### Script (Install NVM & Node)

```bash
#!/bin/bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# Install Node.js
nvm i --lts
# Install jq
sudo apt-get install jq
```

### Upload Files (Upload MVP test file)

## Tests Tab

### Allow Internet

#### Script (Copy test file)

```bash
#!/bin/bash
cp $UPLOADED_FILES/codegrade.test.js .
echo 'Copied test file'
```

#### Script (Install dependencies)

```bash
#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use --lts
npm i
```

#### Connect Rubric

##### Custom Test

```bash
# Write your bash script here, output the score in a JSON object to structured output (file descriptor 3).
# For example: echo '{ "tag": "points", "points": "1/3" }' >&3
#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use --lts
npm run test:codegrade -- codegrade.test.js --json --outputFile=results.json
# Extracting the number of passed and total tests
num_passed_tests=$(jq '.numPassedTests' results.json)
num_total_tests=$(jq '.numTotalTests' results.json)
# Calculating the ratio
if [ "$num_total_tests" -eq 0 ]; then
  echo "No tests were found."
  exit 1
fi
ratio="$num_passed_tests/$num_total_tests"
# Output the result in the desired format
echo "{ \"tag\": \"points\", \"points\": \"$ratio\" }" >&3
```
