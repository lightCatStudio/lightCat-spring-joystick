(function(window) {
    "use strict";

    function lightJoystick(joystickinfo) {
        const joystickelement = {
            JOSZ: '100px',
            JOBS: 'solid',
            JOBW: '1px',
            JOBC: '#D6D6D6',
            JOBR: '50%',
            JOP: 'fixed',
            JOT: '',
            JOB: '',
            JOL: '',
            JOR: '',
            JOBG: 'rgba(255,255,255,0)',
            JOBGIM: '',
            JOSD: '0px 0px 5px #D6D6D6',
            JIBS: 'solid',
            JIBW: '1px',
            JIBC: '#DFDFDF',
            JIBR: '50%',
            JISZ: '50px',
            JIBG: 'rgba(255,255,255,1)',
            JIBGIM: '',
            JISD: '0px 0px 5px #D6D6D6',
            transitionout: '0.1',
            transition: '0.2',
            transitionback: '200',
            scale: '1.1',
            MM: '1.4',
            ZOI: 999,
            ZII: 9999
        };
        this.joysticksettings = Object.assign({}, joystickelement, joystickinfo);
    }

    lightJoystick.prototype.joystick = function(backdata) {
        const self = this;
        const joyob = document.createElement('div');
        const joyib = document.createElement('div');
        let touchIs = false;
        let angle = 0;
        let direction = 'central';

        joyob.style.cssText = `
            height: ${self.joysticksettings.JOSZ};
            width: ${self.joysticksettings.JOSZ};
            border-style: ${self.joysticksettings.JOBS};
            border-width: ${self.joysticksettings.JOBW};
            border-color: ${self.joysticksettings.JOBC};
            border-radius: ${self.joysticksettings.JOBR};
            position: ${self.joysticksettings.JOP};
            top: ${self.joysticksettings.JOT};
            bottom: ${self.joysticksettings.JOB};
            left: ${self.joysticksettings.JOL};
            right: ${self.joysticksettings.JOR};
            background: ${self.joysticksettings.JOBG};
            background-size: cover;
            background-image: ${self.joysticksettings.JOBGIM};
            background-position: center;
            box-shadow: ${self.joysticksettings.JOSD};
            z-index: ${self.joysticksettings.ZOI};
            touch-action: none;
        `;
        joyob.id = 'lightCat-joystick';
        document.body.appendChild(joyob);

        joyib.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-style: ${self.joysticksettings.JIBS};
            border-width: ${self.joysticksettings.JIBW};
            border-color: ${self.joysticksettings.JIBC};
            border-radius: ${self.joysticksettings.JIBR};
            height: ${self.joysticksettings.JISZ};
            width: ${self.joysticksettings.JISZ};
            background: ${self.joysticksettings.JIBG};
            box-shadow: ${self.joysticksettings.JISD};
            background-size: cover;
            background-image: ${self.joysticksettings.JIBGIM};
            background-position: center;
            z-index: ${self.joysticksettings.ZII};
            touch-action: none;
        `;
        joyob.appendChild(joyib);

        const maxradius = parseInt(this.joysticksettings.JOSZ) / this.joysticksettings.MM;
        const delta = {
            x: 0,
            y: 0
        };
        joyib.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (touchIs) {
                return;
            }
            touchIs = true;
            const startX = e.touches[0].clientX;
            const startY = e.touches[0].clientY;
            joyib.addEventListener('touchmove', moveJoystick);
            joyib.addEventListener('touchend', releaseJoystick);

            function moveJoystick(e) {
                joyob.style.transition = "all " + self.joysticksettings.transitionout + "s ease-out";
                joyob.style.transform = "scale(" + self.joysticksettings.scale + ")";
                if (!touchIs) {
                    return;
                }
                const deltaX = e.touches[0].clientX - startX;
                const deltaY = e.touches[0].clientY - startY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const angleRad = Math.atan2(deltaY, deltaX);
                const angleDeg = angleRad * (180 / Math.PI);
                let direction = '';

                if (distance <= maxradius) {
                    joyib.style.left = `calc(50% + ${deltaX}px)`;
                    joyib.style.top = `calc(50% + ${deltaY}px)`;
                } else {
                    const limitedX = Math.cos(angleRad) * maxradius;
                    const limitedY = Math.sin(angleRad) * maxradius;
                    joyib.style.left = `calc(50% + ${limitedX}px)`;
                    joyib.style.top = `calc(50% + ${limitedY}px)`;
                }
                delta.x = deltaX;
                delta.y = deltaY;

                if (angleDeg >= -45 && angleDeg < 45) {
                    direction = 'right';
                } else if (angleDeg >= 45 && angleDeg < 135) {
                    direction = 'down';
                } else if (angleDeg >= 135 || angleDeg < -135) {
                    direction = 'left';
                } else {
                    direction = 'up';
                }

                backdata({
                    x: deltaX,
                    y: deltaY,
                    angle: angleDeg,
                    distance: distance,
                    isTouching: touchIs,
                    direction: direction
                });
            }

            function releaseJoystick() {
                if (!touchIs) {
                    return;
                }
                touchIs = false;
                joyib.removeEventListener('touchmove', moveJoystick);
                joyib.removeEventListener('touchend', releaseJoystick);
                joyib.style.left = '50%';
                joyib.style.top = '50%';
                joyib.style.transition = "all " + self.joysticksettings.transition + "s ease-out";
                setTimeout(function() {
                    joyib.style.transition = "none";
                }, self.joysticksettings.transitionback)
                joyob.style.transition = "all " + self.joysticksettings.transitionout + "s ease-out";
                joyob.style.transform = "none";
                delta.x = 0;
                delta.y = 0;

                backdata({
                    x: 0,
                    y: 0,
                    angle: 0,
                    distance: 0,
                    isTouching: touchIs,
                    direction: direction
                });
            }
        })
    };

    lightJoystick.prototype.joystickClear = function() {
        const joystickElements = document.querySelectorAll('*[id^="lightCat-joystick"]');
        joystickElements.forEach(element => element.remove());
    }

    window.lightJoystick = lightJoystick;
})(window);