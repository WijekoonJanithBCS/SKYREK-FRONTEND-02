

export function Createproduct(req, res) {

    console.log(req.user);

    res.json({
        message: "Product created successfully..."
    });
}