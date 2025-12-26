
Use a user-owned global npm directory

This is the official npm-recommended approach.

Step 1: Create a global npm directory in your home folder
mkdir -p ~/.npm-global

Step 2: Tell npm to use it
npm config set prefix '~/.npm-global'

Step 3: Add it to your PATH

export PATH="$HOME/.npm-global/bin:$PATH"