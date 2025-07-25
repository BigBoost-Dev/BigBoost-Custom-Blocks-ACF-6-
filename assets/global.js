jQuery(function ($) {

    let height = $('.bb-slider-content').outerHeight();
    $('.bb-slider-images').height(height);
    let previousIndex = 0;

    $('.bb-slider-actions').on('click', function (e) {
        e.preventDefault();
        const targetIndex = $('.bb-slider-actions').index(this);
        const items = $('.bb-slider-item');

        // Prevent multiple clicks during animation
        if (isAnimating) return;

        let clForward = {
            0: ["active", "next", "pre-pre d-none", "previous"],
            1: ["previous", "active", "next", "pre-pre d-none"],
            2: ["pre-pre d-none", "previous", "active", "next"],
            3: ["next", "pre-pre d-none", "previous", "active"]
        }

        let clReverse = {
            0: ["active", "next", "next-next d-none", "previous"],
            1: ["previous", "active", "next", "next-next d-none"],
            2: ["next-next d-none", "previous", "active", "next"],
            3: ["next", "next-next d-none", "previous", "active"]
        }

        function animateStep(currentIndex, targetIndex, isForward) {
            const classes = isForward ? clForward : clReverse;
            $('.bb-slider-item').removeClass('previous active next next-next pre-pre d-none');

            for (let i = 0; i < classes[currentIndex]?.length; i++) {
                $(items[i]).addClass(`${classes[currentIndex][i]}`)
            }

            setTimeout(() => {
                if (isForward) {
                    if (targetIndex == 4) {
                        console.log("Jimi")
                    } else {
                        $('.pre-pre').addClass('next-next')
                        $('.next-next').removeClass('pre-pre d-none')
                    }

                } else {
                    if (targetIndex == 0) {
                        console.log("Nithyaja")
                    } else {
                        $('.next-next').addClass('pre-pre')
                        $('.pre-pre').removeClass('next-next d-none')
                    }

                }
            }, 2000)
        }

        function animateToTarget(start, target) {
            isAnimating = true;
            let current = start;

            function nextStep() {
                if (current === target) {
                    previousIndex = target;
                    $('.bb-slider-description').slideUp(300);
                    $($('.bb-slider-actions')[target]).closest('div').find('.bb-slider-description').slideToggle(300);
                    isAnimating = false;
                    return;
                }
                const isForward = current < target;
                current = isForward ? current + 1 : current - 1;
                animateStep(current, target, isForward);
                setTimeout(nextStep, 300);
            }

            nextStep();
        }

        if (previousIndex !== targetIndex) {
            animateToTarget(previousIndex, targetIndex);
        }

    });

    $('.bb-toggle-slider').on('click', function (e) {
        e.preventDefault();
        if ($(this).closest('div').hasClass('active')) {
            $('.bb-slider-context > div').removeClass('active')
            $(this).closest('div').find('.bb-slider-description').slideUp()
        } else {
            $('.bb-slider-context > div').removeClass('active')
            $(this).closest('div').addClass('active')
            $('.bb-slider-description').slideUp()
            $(this).closest('div').find('.bb-slider-description').slideToggle()
        }
    })

    // Initialize animation state
    let isAnimating = false;

    $('.bb-downarrow').on('click', function (e) {
        e.preventDefault();
        if ($(this).closest('.d-flex.justify-content-between').next('.bb-faq-description').hasClass('active')) {
            $('.bb-faq-description').slideUp(100)
            $(this).closest('.d-flex.justify-content-between').next('.bb-faq-description').removeClass('active')
        } else {
            $('.bb-faq-title').find('.bb-faq-description').removeClass('active')
            $('.bb-faq-description').slideUp(100)
            $(this).closest('.d-flex.justify-content-between').next('.bb-faq-description').slideToggle(300)
            $(this).closest('.d-flex.justify-content-between').next('.bb-faq-description').addClass('active')
        }

    })
})