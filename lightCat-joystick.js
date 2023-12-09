(function(window) {
    "use strict";
    function lightJoystick(joystickinfo) {
        var joystickindex = {
            JOBP: 'fixed',
            JOBT: '',
            JOBB: '',
            JOBL: '',
            JOBR: '',
            JOBBS: 'solid',
            JOBBW: '1px',
            JOBBR: '50%',
            JOBBC: '#D0D0D0',
            JOBBGC: 'rgba(255,255,255,0)',
            JOBS: '200px',
            JIBBC: '#EEEEEE',
            JIBG: '#FFFFFF',
            JIBBS: 'solid',
            JIBBR: '50%',
            JIBS: '70px',
            scale: '1.1',
            MM: 1.4
        };
        this.joysticksettings = Object.assign({}, joystickindex, joystickinfo);
    }
    lightJoystick.prototype.joystick = function(callback) {
        var self = this;
        var isTouching = false;
        var joyb = document.createElement('div');
        joyb.style.cssText = `
            position: ${self.joysticksettings.JOBP};
            top: ${self.joysticksettings.JOBT};
            bottom: ${self.joysticksettings.JOBB};
            left: ${self.joysticksettings.JOBL};
            right: ${self.joysticksettings.JOBR};
            width: ${self.joysticksettings.JOBS};
            height: ${self.joysticksettings.JOBS};
            border-style: ${self.joysticksettings.JOBBS};
            border-width: ${self.joysticksettings.JOBBW};
            border-radius: ${self.joysticksettings.JOBBR};
            border-color: ${self.joysticksettings.JOBBC};
            background-color: ${self.joysticksettings.JOBBGC};
            touch-action: none;
        `;
        document.body.appendChild(joyb);
        var joyib = document.createElement('div');
        joyib.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            height: ${self.joysticksettings.JIBS};
            width: ${self.joysticksettings.JIBS};
            border-style: ${self.joysticksettings.JIBBS};
            border-color: ${self.joysticksettings.JIBBC};
            border-radius: ${self.joysticksettings.JIBBR};
            background: ${self.joysticksettings.JIBG};
            touch-action: none;
        `;
        joyb.appendChild(joyib);
        var maxRadius = parseInt(this.joysticksettings.JOBS) / this.joysticksettings.MM;
        var delta = {
            x: 0,
            y: 0
        };
        joyib.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (isTouching) {
                return;
            }
            isTouching = true;
            var startX = e.touches[0].clientX;
            var startY = e.touches[0].clientY;
            document.body.addEventListener('touchmove', moveJoystick);
            document.body.addEventListener('touchend', releaseJoystick);
            function moveJoystick(e) {
                joyb.style.transition = "all 0.1s ease-out";
                joyb.style.transform = "scale(" + self.joysticksettings.scale + ")";
                if (!isTouching) {
                    return;
                }
                var deltaX = e.touches[0].clientX - startX;
                var deltaY = e.touches[0].clientY - startY;
                var distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                if (distanceFromCenter <= maxRadius) {
                    joyib.style.left = `calc(50% + ${deltaX}px)`;
                    joyib.style.top = `calc(50% + ${deltaY}px)`;
                } else {
                    var angle = Math.atan2(deltaY, deltaX);
                    var limitedX = Math.cos(angle) * maxRadius;
                    var limitedY = Math.sin(angle) * maxRadius;
                    joyib.style.left = `calc(50% + ${limitedX}px)`;
                    joyib.style.top = `calc(50% + ${limitedY}px)`;
                }
                delta.x = deltaX;
                delta.y = deltaY;
                callback({
                    distance: distanceFromCenter,
                    delta: delta
                });
            }
            function releaseJoystick() {
                if (!isTouching) {
                    return;
                }
                isTouching = false;
                document.body.removeEventListener('touchmove', moveJoystick);
                document.body.removeEventListener('touchend', releaseJoystick);
                joyib.style.left = '50%';
                joyib.style.top = '50%';
                joyb.style.transition = "all 0.1s ease-in";
                joyb.style.transform = "none";
                delta.x = 0;
                delta.y = 0;
                callback({
                    distance: 0,
                    delta: delta
                });
            }
        });
    };
    window.lightJoystick = lightJoystick;
})(window);