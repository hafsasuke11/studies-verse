const User = require('../myschema/UserSchema');

const getProfile = async (req, res) => {
    try {
        // User info is already in req.user from verifyToken middleware
        const user = await User.findById(req.user.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                error: 'User not found' 
            });
        }

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ 
            error: 'Server error fetching profile' 
        });
    }
};

module.exports = getProfile;